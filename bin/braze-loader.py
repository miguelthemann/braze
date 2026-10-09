#!/usr/bin/env python3
"""
Braze Browser Native Extension Bridge
Silently and seamlessly loads the internal Braze extension into the running Firefox instance
without any third-party npm/web-ext dependencies, zero terminal spam, and sub-100ms execution.
"""
import os
import sys
import time
import json
import socket

def rdp_send(sock, payload):
    data = json.dumps(payload)
    sock.sendall(f"{len(data)}:{data}".encode("utf-8"))

def rdp_recv(sock):
    buf = b""
    while b":" not in buf:
        chunk = sock.recv(1)
        if not chunk:
            raise EOFError("Socket closed prematurely")
        buf += chunk
    length_str, rest = buf.split(b":", 1)
    target_len = int(length_str)
    body = rest
    while len(body) < target_len:
        chunk = sock.recv(target_len - len(body))
        if not chunk:
            raise EOFError("Socket closed during body read")
        body += chunk
    return json.loads(body.decode("utf-8"))

def main():
    if len(sys.argv) < 3:
        sys.exit(0)

    sock_path = sys.argv[1]
    extension_path = os.path.abspath(sys.argv[2])

    # Wait up to 15 seconds for the socket to appear and accept connections
    deadline = time.time() + 15.0
    connected = False
    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    sock.settimeout(4.0)

    while time.time() < deadline:
        if os.path.exists(sock_path):
            try:
                sock.connect(sock_path)
                connected = True
                break
            except (socket.error, OSError):
                time.sleep(0.05)
        else:
            time.sleep(0.05)

    if not connected:
        sys.exit(0)

    try:
        # 1. Read initial greeting from root actor
        rdp_recv(sock)

        # 2. Query root to discover addons actor ID
        rdp_send(sock, {"to": "root", "type": "getRoot"})
        root_resp = rdp_recv(sock)
        addons_actor = root_resp.get("addonsActor")

        if addons_actor:
            # 3. Mount extension seamlessly as active add-on
            rdp_send(sock, {
                "to": addons_actor,
                "type": "installTemporaryAddon",
                "addonPath": extension_path
            })
            rdp_recv(sock)
    except Exception:
        pass
    finally:
        try:
            sock.close()
        except Exception:
            pass

if __name__ == "__main__":
    main()

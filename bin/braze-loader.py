#!/usr/bin/env python3
import os, sys, time, json, socket
def rdp_send(sock, payload):
    data = json.dumps(payload)
    sock.sendall(f"{len(data)}:{data}".encode("utf-8"))
def rdp_recv(sock):
    buf = b""
    while b":" not in buf:
        chunk = sock.recv(1)
        if not chunk: raise EOFError("Socket closed")
        buf += chunk
    length_str, rest = buf.split(b":", 1)
    target_len = int(length_str)
    body = rest
    while len(body) < target_len:
        chunk = sock.recv(target_len - len(body))
        if not chunk: raise EOFError("Socket closed")
        body += chunk
    return json.loads(body.decode("utf-8"))
def main():
    if len(sys.argv) < 3: sys.exit(0)
    port = int(sys.argv[1])
    ext_path = os.path.abspath(sys.argv[2])
    deadline = time.time() + 15.0
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2.0)
    connected = False
    while time.time() < deadline:
        try:
            sock.connect(("127.0.0.1", port))
            connected = True
            break
        except Exception:
            time.sleep(0.1)
    if not connected: sys.exit(0)
    try:
        # Wait a bit for UI to settle
        time.sleep(1.5)
        rdp_recv(sock) # Greeting
        rdp_send(sock, {"to": "root", "type": "getRoot"})
        root = rdp_recv(sock)
        addons = root.get("addonsActor")
        if addons:
            rdp_send(sock, {"to": addons, "type": "installTemporaryAddon", "addonPath": ext_path})
            rdp_recv(sock)
    except Exception as e:
        pass
    finally:
        try: sock.close()
        except: pass
if __name__ == "__main__": main()

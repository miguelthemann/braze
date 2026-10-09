Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

appData = WshShell.ExpandEnvironmentStrings("%APPDATA%")
installDir = fso.GetParentFolderName(WScript.ScriptFullName)

profileDir = appData & "\Braze\profile"

If Not fso.FolderExists(profileDir) Then
    If Not fso.FolderExists(appData & "\Braze") Then
        fso.CreateFolder(appData & "\Braze")
    End If
    fso.CopyFolder installDir & "\profile", profileDir
End If

WshShell.Run """" & installDir & "\braze.exe"" -profile """ & profileDir & """", 1, False

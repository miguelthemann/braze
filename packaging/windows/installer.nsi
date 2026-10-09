!include "MUI2.nsh"

!ifndef VERSION
  !define VERSION "1.0.0"
!endif

Name "Braze Browser"
OutFile "..\..\Braze-Setup-${VERSION}.exe"
InstallDir "$PROGRAMFILES64\Braze"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Portuguese"
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Italian"

Section "Braze Core" SecCore
  SetOutPath "$INSTDIR"
  
  # The runner will drop the prepared files into build-win\Braze
  File /r "..\..\build-win\Braze\*"

  # Create an invisible launcher script in VBScript to run python loader + braze.exe silently
  # Alternatively, just create a shortcut with arguments
  CreateDirectory "$SMPROGRAMS\Braze"
  
  # For Windows, we would theoretically use a local python installation or just rely on a small executable launcher.
  # To keep this simple and dependency-free on Windows, we can just run braze.exe with the profile.
  # The user will get the profile natively since we copy autoconfig.js into defaults\pref
  CreateShortcut "$SMPROGRAMS\Braze\Braze.lnk" "$INSTDIR\braze.exe" "-profile $\"$INSTDIR\profile$\"" "$INSTDIR\profile\chrome\icon-128.png"
  CreateShortcut "$DESKTOP\Braze.lnk" "$INSTDIR\braze.exe" "-profile $\"$INSTDIR\profile$\"" "$INSTDIR\profile\chrome\icon-128.png"
  
  WriteUninstaller "$INSTDIR\uninstall.exe"
  
  # Register in Add/Remove Programs
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "DisplayName" "Braze Browser"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "Publisher" "Miguel The Mann"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "DisplayIcon" "$\"$INSTDIR\braze.exe$\",0"
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\Braze.lnk"
  Delete "$SMPROGRAMS\Braze\Braze.lnk"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze"
SectionEnd

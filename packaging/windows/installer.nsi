; SPDX-License-Identifier: MIT
; Copyright (c) 2026 Miguel G. (miguelthemann)

!include "MUI2.nsh"

!ifndef VERSION
  !define VERSION "1.3.1"
!endif

Name "Braze Browser"
OutFile "..\..\Braze-Setup-${VERSION}.exe"
InstallDir "$PROGRAMFILES64\Braze"
RequestExecutionLevel admin

!define MUI_ICON "..\..\assets\icon.ico"
!define MUI_UNICON "..\..\assets\icon.ico"

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
  
  # Terminar processos anteriores do braze.exe que possam estar a bloquear ficheiros ou o perfil
  ExecWait 'taskkill /F /IM braze.exe'

  # The runner will drop the prepared files into build-win\Braze
  File /r "..\..\build-win\Braze\*"

  # Criar atalhos nativos apontando diretamente para o executável braze.exe
  CreateDirectory "$SMPROGRAMS\Braze"
  CreateShortcut "$SMPROGRAMS\Braze\Braze.lnk" "$INSTDIR\braze.exe" "" "$INSTDIR\braze.exe" 0
  CreateShortcut "$DESKTOP\Braze.lnk" "$INSTDIR\braze.exe" "" "$INSTDIR\braze.exe" 0
  
  WriteUninstaller "$INSTDIR\uninstall.exe"
  
  # Register in Add/Remove Programs
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "DisplayName" "Braze Browser"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "Publisher" "Miguel The Mann"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze" "DisplayIcon" "$\"$INSTDIR\braze.exe$\""
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\Braze.lnk"
  Delete "$SMPROGRAMS\Braze\Braze.lnk"
  RMDir "$SMPROGRAMS\Braze"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Braze"
SectionEnd

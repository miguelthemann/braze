; SPDX-License-Identifier: MIT
; Copyright (c) 2026 Miguel G. (miguelthemann)

!include "MUI2.nsh"

!ifndef VERSION
  !define VERSION "1.3.6"
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
!define MUI_FINISHPAGE_RUN "$INSTDIR\braze.exe"
!define MUI_FINISHPAGE_RUN_PARAMETERS '-app "$INSTDIR\browser\application.ini"'
!define MUI_FINISHPAGE_RUN_TEXT "Executar Braze Browser"
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

  # Criar atalhos nativos apontando diretamente para o executável braze.exe com o manifesto Braze
  CreateDirectory "$SMPROGRAMS\Braze"
  CreateShortcut "$SMPROGRAMS\Braze\Braze.lnk" "$INSTDIR\braze.exe" '-app "$INSTDIR\browser\application.ini"' "$INSTDIR\braze.exe" 0 SW_SHOWNORMAL "" "Braze Browser"
  CreateShortcut "$DESKTOP\Braze.lnk" "$INSTDIR\braze.exe" '-app "$INSTDIR\browser\application.ini"' "$INSTDIR\braze.exe" 0 SW_SHOWNORMAL "" "Braze Browser"
  
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

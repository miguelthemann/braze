# 🐱 BRAZE BROWSER
> *O grande rival do Microfost Ledge no mercado da navegação de qualidade duvidosa.*

O **Braze** é uma paródia completa do Brave Browser construída com o motor **Gecko** (Firefox), concebido para trazer de volta o caos dos primórdios da internet.

---

## 🚀 Como Iniciar

Podes abrir o **Braze** de duas formas no teu sistema Linux:

### 1. Pelo Terminal:
```bash
/home/miguel/Projectos/braze/bin/braze
```
*(Ou se adicionares `~/Projectos/braze/bin` ao teu PATH, podes simplesmente escrever `braze`)*

### 2. Pelo Menu de Aplicações do Ambiente de Trabalho:
Procura por **"Braze Browser"** no lançador do teu sistema (GNOME, KDE, XFCE, etc.) — já está registado com o ícone do gato assustado!

---

## 🛠️ O Que Foi Criado

| Componente | Ficheiros | Descrição |
| :--- | :--- | :--- |
| **Logótipo do MS Paint** | `assets/cat_logo.svg`, `assets/icon-*.png` | Gato aterrorizado em vetor MS Paint com olhos esbugalhados, bigodes trémulos e suor frio. |
| **Dashboard / New Tab** | `home/index.html` | Réplica satírica do Brave New Tab com estatísticas hilariantes, relógio ao vivo e atalhos retro. |
| **Braze Shields™ (Extensão)** | `extension/`, `braze-shields.xpi` | Extensão WebExtension embutida com: <br>• **Reverse Ad-Blocker:** Destaca anúncios com bordas néon e injeta pop-ups do "Visitante nº 1.000.000" cujo botão `[X]` foge do cursor.<br>• **Zero Privacidade:** Notificações periódicas de envio de dados para servidores na Sibéria e WhatsApp da família.<br>• **Mineração Doge:** Simulador de CPU a 99% e botão turbo para acelerar as ventoinhas do PC. |
| **Tema Gecko / userChrome** | `profile/chrome/userChrome.css` | Personalização da interface do Firefox com cores Braze e o distintivo `🐱 BRAZE` ao lado da barra de endereços. |
| **Perfil Isolado** | `profile/user.js` | Perfil Gecko totalmente isolado para não interferir com a tua instalação pessoal do Firefox. |

---

## 🧬 E se quiseres fazer o Fork C++/Rust Nativo (`mozilla-central`)?
Se no futuro quiseres compilar um binário `.deb`/`.rpm` com o nome `braze` gravado no próprio código de baixo nível C++:
1. Clona o código da Mozilla: `git clone https://github.com/mozilla/gecko-dev`
2. Substitui os ficheiros em `browser/branding/unofficial/` pelos assets criados na pasta `assets/`.
3. Adiciona as políticas de distribuição em `browser/components/enterprisepolicies/`.
4. Compila com `./mach build` (requer cerca de 45GB de disco e 1-2h de compilação).

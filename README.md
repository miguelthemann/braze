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

### 3. Como Ativar o Braze Shields (Sem Erros de Assinatura):
Como o motor Gecko oficial bloqueia ficheiros `.xpi` sem assinatura criptográfica da Mozilla, tens duas formas imediatas de ativar:
* **Permanente no Linux:** Executa `sudo ~/Projectos/braze/bin/ativar-extensao.sh` (instala a política para o Gecko carregar a extensão sem verificação).
* **Imediato sem root:** No Braze, acede a `about:debugging` -> *Este Firefox* -> *Carregar extensão temporária...* e seleciona `extension/manifest.json`.
* **Assinatura Oficial AMO:** Se quiseres o `.xpi` oficialmente assinado pela Mozilla, podes correr `~/Projectos/braze/bin/assinar-extensao.sh` ou submeter em [addons.mozilla.org](https://addons.mozilla.org/developers/addon/submit/upload-unlisted).

---

## 🛠️ O Que Foi Criado

| Componente | Ficheiros | Descrição |
| :--- | :--- | :--- |
| **Logótipo do MS Paint** | `assets/cat_logo.svg`, `assets/icon-*.png` | Gato aterrorizado em vetor MS Paint com olhos esbugalhados, bigodes trémulos e suor frio. |
| **Motor de Busca Oficial** | `home/copernico.xml`, `distribution/policies.json` | **ITIS Copernico Search** integrado por omissão na barra de endereços e formulário de pesquisa. |
| **Dashboard / New Tab** | `home/index.html` | Réplica satírica do Brave New Tab com pesquisa ITIS Copernico, estatísticas ao vivo e atalhos. |
| **Braze Shields™ (Extensão)** | `extension/`, `braze-shields.xpi` | Extensão WebExtension embutida com: <br>• **Nova Aba Incorporada:** Substitui nativamente o `about:newtab` pelo painel caótico do Braze (`chrome_url_overrides`).<br>• **Default Search Override:** Define o ITIS Copernico Search como motor nativo.<br>• **Reverse Ad-Blocker:** Destaca anúncios com bordas néon e injeta pop-ups do "Visitante nº 1.000.000" cujo botão `[X]` foge do cursor.<br>• **Zero Privacidade:** Notificações periódicas de envio de dados para a Sibéria.<br>• **Mineração Doge:** Simulador de CPU a 99% e botão turbo para acelerar as ventoinhas. |
| **Tema Gecko / userChrome** | `profile/chrome/userChrome.css` | Remoção total do Firefox (oculta Firefox View, Firefox Accounts, Pocket), adiciona banner `🐱 BRAZE` no menu e barra. |
| **Perfil Isolado & Branding** | `profile/user.js`, `bin/braze` | User Agent exclusivo `Braze/1.0`, variáveis de ambiente `MOZ_APP_DISPLAYNAME="Braze"`, sem telemetria da Mozilla. |

---

## 🧬 E se quiseres fazer o Fork C++/Rust Nativo (`mozilla-central`)?
Se no futuro quiseres compilar um binário `.deb`/`.rpm` com o nome `braze` gravado no próprio código de baixo nível C++:
1. Clona o código da Mozilla: `git clone https://github.com/mozilla/gecko-dev`
2. Substitui os ficheiros em `browser/branding/unofficial/` pelos assets criados na pasta `assets/`.
3. Adiciona as políticas de distribuição em `browser/components/enterprisepolicies/`.
4. Compila com `./mach build` (requer cerca de 45GB de disco e 1-2h de compilação).

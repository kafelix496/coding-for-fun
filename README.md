[![codecov](https://codecov.io/gh/coding-for-fun-org/frontend/graph/badge.svg?token=C4WXQGTZTM)](https://codecov.io/gh/coding-for-fun-org/frontend)

# Coding for fun

My personal playground for coding and learning.

### How to set .env file for local development

1. Copy the `.env.example` file and rename it to `.env`
2. How to set `AUTH_SECRET`
    1. Generate a random string by running the following command in the terminal
        ```bash
        openssl rand -base64 32
        ```
3. How to set `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_APP_ID`, `GITHUB_PRIVATE_KEY`
    1. Go to [profile](https://github.com/settings/profile) and click on `Developer settings` in the left menu
    2. Click on `Github Apps` in the left menu
    3. Click on `New Github App` button
    4. Fill in the form
        1. Give it a name
            1. This will be the name of `NEXT_PUBLIC_GITHUB_APP_SLUG`
        2. Give it a homepage url
            1. Example: `http://localhost:3000`
        3. Give it a callback url
            1. Example: `http://localhost:3000/callback/auth/github/authorize`
            2. Example: `http://localhost:3000/api/auth/callback/github`
        4. Check `Expire user authorization tokens`
        5. Give it a setup url
            1. Example: `http://localhost:3000/callback/auth/github/application-install`
        6. Check `Redirect on update`
        7. Uncheck `Active` checkbox from `Webhook` section
        8. Don't forget to check `Any account` for the `Where can this Github App be installed?` field
        9. Click on `Create a Github App` button
        10. Click on `Generate a private key`
        11. Run the following command to convert the private key to pkcs8 format
            1. `openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in DOWNLOADED_PRIVATE_KEY_PATH -out private-key-pkcs8.key`
            2. Open the `private-key-pkcs8.key` file and copy the content
            3. Paste the content in the `GITHUB_PRIVATE_KEY` field in the `.env` file
        12. Copy the `Client ID` and paste it in the `GITHUB_ID` field in the `.env` file
        13. Copy the `Client secrets` and paste it in the `GITHUB_SECRET` field in the `.env` file
            1. If you don't see the `Client secrets` click on `Generate a new client secret` button
        14. Copy the `App ID` and paste it in the `GITHUB_APP_ID` field in the `.env` file

4. For the permissions & events
    - Repository permissions
        - Administration : Read-only
        - Checks : Read and write
        - Contents : Read-only
        - Metadata : Read-only
        - Pull requests : Read and write
    - Organization permissions
        - Plan : Read-only

### For the newbie for programming

1. You need terminal to run the following commands. Open the `spotlight` by pressing `cmd + space` and type `terminal` and press `enter`.
2. You probably need to install `node` first. You can download it from [here](https://nodejs.org/en/download/). I personally recommend using `brew` to install `node` on Mac. You can install `brew` by running the following command in the terminal.
    1. What is homebrew? Homebrew is a package manager for Mac. You can install a lot of software by running a single command. You can find more information about homebrew [here](https://brew.sh/)
    2. How to install node using homebrew?
        ```bash
        brew install node
        ```
3. Clone the repository by running the following command in the terminal.
    ```bash
    git clone https://github.com/coding-for-fun-org/frontend.git
    ```
4. Go to the project directory by running the following command in the terminal.
    ```bash
    cd frontend
    ```
5. Install the dependencies by running the following command in the terminal.
    ```bash
    npm install
    ```

### Color scheme

##### Top Level semantic colors

- background: background color of whole section, card, body, etc.
- foreground: text, icons, and any elements on top of a background.
- border: border color of any element.

```scss
:root {
  // background colors for the card, body, etc.
  --background-primary: #000000;
  --background-secondary: #000000;
  --background-tertiary: #000000;
  // interactive background colors such as button, etc.
  --background-interactive-primary-default: #000000;
  --background-interactive-primary-hover: #000000;
  --background-interactive-primary-active: #000000;

  // colors on top of the background colors such as text, icons, etc.
  --foreground-primary: #000000;
  --foreground-secondary: #000000;
  --foreground-tertiary: #000000;
  // colors on top of the background colors BUT with a contained variant background
  --foreground-inverse-primary: #000000;
  --foreground-inverse-secondary: #000000;
  --foreground-inverse-tertiary: #000000;
  // interactive foreground colors such as button text, etc.
  --foreground-interactive-primary-default: #000000;
  --foreground-interactive-primary-hover: #000000;
  // feedback colors such as toast message, inline message etc.
  --foreground-system-success: #000000;

  // typical border colors for the card, input, etc.
  --border-primary: #000000;
  --border-secondary: #000000;
  --border-tertiary: #000000;

  //
  --border-input-default: #000000;
  --border-input-hover: #000000;
  --border-input-focus: #000000;

  // border radius
  --radius: 0.5rem;
}
```

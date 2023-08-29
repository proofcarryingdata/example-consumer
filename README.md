<p align="center">
    <h1 align="center">
        PCD Consumer
    </h1>
</p>

| This monorepo contains a sample application and server to demonstrate the PCD SDK usage for consuming a PCD with a PCD passport. |
| -------------------------------------------------------------------------------------------------------------------------------- |

## 📦 Packages

<table>
    <th>Package</th>
    <th>Version</th>
    <th>Downloads</th>
    <tbody>
        <tr>
            <td>
                <a href="/packages/app">
                    @example-consumer/app
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@example-consumer/app">
                    <img src="https://img.shields.io/npm/v/@example-consumer/app.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@example-consumer/app">
                    <img src="https://img.shields.io/npm/dm/@example-consumer/app.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
        </tr>
                <tr>
            <td>
                <a href="/packages/app">
                    @example-consumer/server
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@example-consumer/server">
                    <img src="https://img.shields.io/npm/v/@example-consumer/server.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@example-consumer/server">
                    <img src="https://img.shields.io/npm/dm/@example-consumer/server.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
        </tr>
    <tbody>
</table>

## 🛠 Install

Use this repository as a Github [template](https://github.com/proofcarryingdata/example-consumer/generate).

Clone your repository:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
```

and install the dependencies:

```bash
cd <your-repo> && yarn
```

## 📜 Usage

Copy the `.env.example` file as `.env`:

```bash
cp .env.example .env
```

And add your environment variables.

Run the following command to start the application (app + server):

```bash
yarn start
```

<p align="center">
    <h1 align="center">
        PCD Consumer
    </h1>
</p>

| This monorepo contains a sample application and server to demonstrate the PCD SDK usage for consuming a PCD with a PCD passport. |
| -------------------------------------------------------------------------------------------------------------------------------- |

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

Run the following command to build (client + server):

```sh
yarn build
```

Run the following command to start the application (client + server):

```bash
yarn start
```

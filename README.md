# Kokeshi

AI Powered Communication Tool

## Development 👷

### Setup

```shell
npm i
```

### Start

```shell
npx supabase start
npm run dev
```

### Serve edge functions

```shell
npm run dev:functions:openai
npm run dev:functions:pay
```

*`npm run dev:functions` currently not working.*

### Deploy

```shell
npx supabase functions deploy openai --project-ref <SUPABASE_PROJECT_REF>
```

### Set secrets 

supabase

```shell
npx supabase secrets set <SECRET_NAME=secret_value>
```

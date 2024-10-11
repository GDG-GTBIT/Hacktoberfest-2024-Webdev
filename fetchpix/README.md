![twitter header](https://github.com/user-attachments/assets/34199692-317b-428a-98b6-48dbc34c9e8a)

## [![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)
[![GitHub stars](https://badgen.net/github/stars/HarjjotSinghh/fetchpix?color=blue)](https://GitHub.com/HarjjotSinghh/fetchpix/stargazers/)
[![Maintainer](https://badgen.net/badge/maintainer/Harjot%20Singh%20Rana/blue)](https://harjot.pro)
[![GitHub branches](https://badgen.net/github/branches/HarjjotSinghh/fetchpix?color=blue)](https://github.com/HarjjotSinghh/fetchpix)
[![GitHub commits](https://badgen.net/github/commits/HarjjotSinghh/fetchpix?color=blue)](https://github.com/HarjjotSinghh/fetchpix/commits/main)
[![GitHub last commit](https://badgen.net/github/last-commit/HarjjotSinghh/fetchpix?color=blue)](https://github.com/HarjjotSinghh/fetchpix/commits/main)
[![GitHub issues](https://badgen.net/github/issues/HarjjotSinghh/fetchpix?color=blue)](https://github.com/HarjjotSinghh/fetchpix/issues)
[![GitHub pull requests](https://badgen.net/github/prs/HarjjotSinghh/fetchpix?color=blue)](https://github.com/HarjjotSinghh/fetchpix/pulls)
[![GitHub watchers](https://badgen.net/github/watchers/HarjjotSinghh/fetchpix?color=blue)](https://GitHub.com/HarjjotSinghh/fetchpix/watchers/)

[cc-by-nc]: LICENSE
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg

# Fetchpix

## Introduction

Fetchpix is a simple and lightweight API to fetch random image URLs based on search queries. It leverages modern web
technologies and microservices architecture to provide a scalable and efficient solution for image retrieval.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Use Cases](#use-cases)
- [Contribute](#contribute)

## Installation

### Local Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/HarjjotSinghh/Fetchpix.git
   cd Fetchpix
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Start the development server:
   ```sh
   bun run index.ts --watch --hot | pino-pretty
   ```

### VPS Setup via Docker Compose

1. Clone the repository:

   ```sh
   git clone https://github.com/HarjjotSinghh/Fetchpix.git
   cd Fetchpix
   ```

2. Ensure Docker and Docker Compose are installed on your VPS.

3. Start the services:
   ```sh
   docker-compose up --build
   ```

## Tech Stack

- **Bun**: A fast JavaScript runtime.
- **Hono**: A small, simple, and fast web framework for the edge.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- **Prometheus**: An open-source monitoring system with a time series database.
- **Swagger**: Simplifies API development by providing tools for API documentation.
- **Elasticsearch**: A distributed, RESTful search and analytics engine.
- **Kibana**: Visualization tool for Elasticsearch.
- **Filebeat**: Lightweight shipper for forwarding and centralizing log data.
- **Node-Cache**: Simple and fast Node.js internal caching.
- **Winston**: A logger for just about everything.

## Use Case

Here is the use case for the Fetchpix API:

#### Web Design / Prototyping

- Fetch images for use in web design mockups or prototypes.
- Use random stock images as placeholders in web design mockups.

## Contribute

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for more details on how to contribute to
this project.

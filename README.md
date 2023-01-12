<div align="center">
  <a target="_blank" href="http://docker.watch"><img align="center" src="https://i.imgur.com/QsnhSy2.png"></a>
</div>

<p align="center">
  <img src ="https://img.shields.io/bower/l/bootstrap">
  <img src ="https://img.shields.io/github/repo-size/oslabs-beta/docker-watch-app">
  <img src ="https://img.shields.io/github/downloads/oslabs-beta/docker-watch-app/total">
</p>

# Table of Contents

- [About](#about) 
- [Installation](#installation) 
- [How to Use](#how-to-use) 
- [How it Works](#how-it-works) 
- [Authors](#authors)
- [License](#license)


## About

DockerWatch is a containerized application that collects and visualizes Docker container metrics over time.

## Installation 

### Prerequisites

- Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Setup

Run the following code in your terminal from the top level directory:

```
curl https://raw.githubusercontent.com/oslabs-beta/docker-watch-app/main/install.yaml | docker-compose -p dockerwatch -f - up -d
```

## How to Use

1. After installing, open your web brower and visit [http://localhost:8855](http://http://localhost:8855)

2. To view a container, click one on the left-hand side to view monitored metrics, including CPU, Memory, Network, and Disk.
<img src ="https://i.imgur.com/CJSiiIF.png">

3. View smaller or larger timeframes of data by clicking the Change Timeframe button and selecting a range of time to view. One hour will view all data from the last hour, one day will view all data from the last day, etc.
<img src ="https://i.imgur.com/ULbHZMM.png">

## How It Works

The DockerWatch container holds four smaller containers: a web container, an api container, an InfluxDB database container, and a sensor container. The sensor collects data from the Docker daemon and stores it in the database. The API container queries for data from the database upon request from the web container. The CPU, Memory, Network, and Disk metrics for all containers in Docker Desktop, including DockerWatch, are monitored for as long as the DockerWatch container is running.

## Authors

- Brynn Sakell [@BrynnSakell](https://github.com/BrynnSakell) | [LinkedIn](https://linkedin.com/in/brynnsakell)
- Dan Pietsch [@dpietsch14](https://github.com/dpietsch14) | [LinkedIn](https://linkedin.com/in/danielpietsch14/)
- Nadia Abowitz [@abowitzn](https://github.com/abowitzn) | [LinkedIn](https://linkedin.com/in/nadia-abowitz/)
- Rob Mosher [@rob-mosher](https://github.com/rob-mosher) | [LinkedIn](https://linkedin.com/in/rob-mosher-it/)
- Stephen Rivas [@stephenpharmd](https://github.com/stephenpharmd) | [LinkedIn](https://linkedin.com/in/stephenpharmd/)

## License

This project is licensed under the [MIT License](LICENSE) 

## Contributing 

DockerWatch launched on January 12, 2023 and is currently in active beta development through the OSlabs Beta community initiative. The application is licensed under the terms of the MIT license, making it a fully open source product. Developers are welcome to contribute to the codebase and expand on its features.

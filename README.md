<div align="center">
  <a target="_blank" href="http://docker.watch"><img align="center" src="https://i.imgur.com/byVZBN4.png"></a>
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

Run the following code in your terminal:

```
url https://raw.githubusercontent.com/oslabs-beta/docker-watch-app/main/install.yaml | docker-compose -f - up -d
```

## How to Use

1. Go into Docker Desktop and expand the DockerWatch container. It contains four containers pertinent to the application.
<img src ="https://i.imgur.com/6CtjGOy.png">
<img src ="https://i.imgur.com/zSzti8B.png">

2. Under the web container, click on the 8080:8080 button to open localhost:8080 in your browser.
<img src ="https://i.imgur.com/wG4MJ1N.png">

3. To view a container, click one on the left-hand side to view monitored metrics, including CPU, Memory, Network, and Disk.
<img src ="https://i.imgur.com/CJSiiIF.png">

4. View smaller or larger timeframes of data by clicking the Change Timeframe button and selecting a range of time to view. One hour will view all data from the last hour, one day will view all data from the last day, etc.
<img src ="https://i.imgur.com/ULbHZMM.png">

## How It Works

The DockerWatch container holds four smaller containers: a web container, an api container, an InfluxDB database container, and a sensor container. The sensor collects data from the containers in Docker Desktop and stores it in the database. The API container queries for data from the database upon request from the web container. The CPU, Memory, Network, and Disk metrics for all containers in Docker Desktop, including DockerWatch, are monitored for as long as the DockerWatch container is running.

## Authors

Brynn Sakell [@BrynnSakell](https://github.com/BrynnSakell) | [LinkedIn]("www.linkedin.com/in/brynnsakell")
Dan Pietsch [@dpietsch14](https://github.com/dpietsch14) | [LinkedIn]("https://www.linkedin.com/in/danielpietsch14/")
Nadia Abowitz [@abowitzn](https://github.com/abowitzn) | [LinkedIn]("https://www.linkedin.com/in/nadia-abowitz/")
Rob Mosher [@rob-mosher](https://github.com/rob-mosher) | [LinkedIn]("https://www.linkedin.com/in/rob-mosher-it/")
Stephen Rivas [@stephenpharmd](https://github.com/stephenpharmd) | [LinkedIn]("https://www.linkedin.com/in/stephenpharmd/")

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md) 

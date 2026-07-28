# Lammy Website

A simple responsive static website built using HTML, CSS, and JavaScript.

## Technologies

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx

## Run Locally

Open `index.html` in your browser.

## Docker

Build the image

```bash
docker build -t lammy-website .
```

Run the container

```bash
docker run -d -p 8080:80 --name lammy-container lammy-website
```

Visit

http://localhost:8080
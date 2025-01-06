# Running the App Using Docker

This guide explains how to set up and run the **MasterCRM React Application** using Docker.

---

## Prerequisites

1. **Download Docker Desktop**: Install Docker from the official [Docker Desktop installation guide](https://docs.docker.com/desktop/setup/install/windows-install/).
2. **Log in to Docker**: Ensure you are logged in to your Docker account via Docker Desktop.

---

## Steps to Run the Application

### Step 1: Pull the Docker Image
1. Open a terminal or command prompt.
2. Run the following command to pull the latest image:
   docker pull hasansid158/mcrm

### Step 2: Start the Application
1. Navigate to the `mastercrm-react` repository.
2. To run the dev environment on PORT 3000, run:
  docker-compose up dev
3. To run the dev container in the background, use:
  docker-compose up dev -d
4. To close down all the containers, run:
  docker-compose down


#### Docker Commands:
- To make a new build, run:
  docker-compose run --rm build

- To install a new npm package, run:
  docker-compose run --rm install package-name

- To uninstall a npm package, run:
  docker-compose run --rm uninstall package-name


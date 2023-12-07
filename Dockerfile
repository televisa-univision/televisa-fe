FROM univision/fe-webapp-base:8

# Expose the app port
EXPOSE 8080

USER root

# Get dumb-init and make it executable
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 && \
    chmod +x /usr/local/bin/dumb-init

# Prepare app directory by:
# 1. Creating it,
RUN mkdir -p /usr/src/app

# Set working directory where the app will be installed
WORKDIR /usr/src/app

# Move app files to container
COPY . /usr/src/app

# Start using the unprivileged user
USER root

# Build and run the app
CMD ["dumb-init", "yarn", "start"]

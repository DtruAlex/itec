FROM debian:bullseye-slim

MAINTAINER dumitrualexpetre@gmail.com

ENV NODE_VERSION 20.18.0
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
ENV PATH /opt/react_native_app/.bin:$PATH

RUN set -eux; \
    groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node \
    && dpkgArch="$(dpkg --print-architecture)" \
    && case "${dpkgArch##*-}" in \
      amd64) dpkgArch='x64';; \
      ppc64el) dpkgArch='ppc64le';; \
      s390x) dpkgArch='s390x';; \
      arm64) dpkgArch='arm64';; \
      armhf) dpkgArch='armv7l';; \
      i386) dpkgArch='x86';; \
      *) echo "unsupported architecture"; exit 1 ;; \
    esac \
    && apt-get update && apt-get install -y  \
      ca-certificates  \
      curl  \
      wget  \
      gnupg  \
      dirmngr  \
      xz-utils  \
      libatomic1  \
      git \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$dpkgArch.tar.xz" \
    && tar -xJf "node-v$NODE_VERSION-linux-$dpkgArch.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
    && npm i --unsafe-perm --allow-root -g npm@latest \
    && apt-mark auto '.*' > /dev/null \
    && find /usr/local -type f -executable -exec ldd '{}' ';' \
      | awk '/=>/ { print $(NF-1) }' \
      | sort -u \
      | xargs -r dpkg-query --search \
      | cut -d: -f1 \
      | sort -u \
      | xargs -r apt-mark manual \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /tmp/* \
    && rm -f "node-v$NODE_VERSION-linux-$dpkgArch.tar.xz" \
    && rm -f yarn.lock \
    && rm -f package.json \
    && mkdir /opt/react_app \
    && mkdir /opt/react_app/app

WORKDIR /opt/react_app/app
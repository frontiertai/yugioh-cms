FROM php:8.3-fpm
EXPOSE 5173

# 必要なパッケージのインストール
RUN apt-get update \
    && apt-get install -y \
    git \
    zip \
    unzip \
    vim \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    libfontconfig1 \
    libxrender1

# PHPの拡張をインストール
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd bcmath pdo_mysql mysqli exif

# Composerのインストール
RUN curl -s http://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# NVMのインストール
ENV NODE_VERSION=20.15.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# ユーザーを作成する
ARG USERNAME=user
ARG GROUPNAME=user
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID $GROUPNAME && \
    useradd -m -u $UID -g $GID $USERNAME

# NVMの環境変数を設定
ENV NVM_DIR=/home/$USERNAME/.nvm
ENV NODE_VERSION=$NODE_VERSION
ENV PATH="$NVM_DIR/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# NVMを使ってNode.jsをインストール
RUN bash -c "source /root/.nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION}"

# Node.jsとnpmのバージョンを確認
RUN bash -c "source /root/.nvm/nvm.sh && node --version && npm --version"

# 作業ディレクトリの設定
WORKDIR /src

# ソースコードの追加
ADD . /src/
RUN chown -R $USERNAME:$GROUPNAME /src

# ユーザーを切り替える
USER $USERNAME

# ENTRYPOINT
# ENTRYPOINT ["bash", "-c", "source $NVM_DIR/nvm.sh && npm install; composer install;"]

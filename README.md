# WatsonClassifyImagesApp
Aplicativo em React Native para Android/iOS, utilizando a API do Watson, com o intuito de identificar imagens semelhantes atráves de Inteligência artificial.

## Motivação
O propósito da criação desse aplicativo, foi aplicar os conhecimentos já existentes em React Native, voltados a uma plataforma de interesse, o Watson da IBM.

## Comunicação com a API
Para a comunicação com API de classificação das imagens, foi utilizada o Axios, onde as requisições ocorreram por POST, sendo passado no body da requisição o link da imagem a ser categorizada, e também o rating de tolerância. A rede neural já encontra-se treinada, dessa forma, não é necessário realizar chamadas com imagens de treinamento.

## Funcionamento
A aplicação inicialmente realiza a classificação de algumas imagens pré listadas, após esse carregamento, já é possível utilizar o aplicativo, que consiste em: Após o clique do usuário em uma das imagens, o aplicativo marcará em verde todas imagens, que atráves da classificação realizada anteriormente, são semelhantes.

## Rodando o App
```
git clone https://github.com/Bruno-Zamp/WatsonClassifyImagesApp.git
cd WatsonClassifyImagesApp
npm i
expo start
```

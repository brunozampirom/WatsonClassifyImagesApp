# WatsonClassifyImagesApp
Aplicativo em React Native para Android/iOS, utilizando a API do Watson, com o intuito de identificar imagens semelhantes atráves de Inteligência artificial.

## Motivação
O propósito da criação desse aplicativo, foi aplicar os conhecimentos já existentes em React Native, voltados a uma plataforma de interesse, o Watson da IBM.

## Comunicação com a API
Para a comunicação com API utilizada para classificação das imagens, foi utilizada a biblioteca Axios, onde as requisições ocorreram por chamadas POST, sendo passado no body da requisição o link da imagem a ser categorizada, e também o rating de tolerância. A rede neural já encontra-se treinada, dessa forma, não é necessário realizar chamadas com imagens de treinamento.

## Funcionamento
A aplicação inicialmente realiza a classificação de alguns imagens pré listadas, após esse carregamento, já é possível utilizar o aplicativo, que consiste em: Após o clique do usuário em uma das imagens, o aplicativo marcará em verde todas imagens, que atráves da classificação realizada anteriormente, são semelhantes.

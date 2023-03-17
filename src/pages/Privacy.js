import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import AppConfig from 'src/AppConfig';

const Privacy = () => (
  <>
    <Helmet>
      <title>{'Política de Privacidade'}</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          Política de Privacidade
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
          style={{marginTop: 30}}
        >
          A sua privacidade é importante para nós. É política do TecSoftwar81 respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site TecSoftwar81, e outros sites que possuímos e operamos.


        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
         </Typography>
         <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

        </Typography>

        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"
          style={{marginTop: 20}}
        >
          Compromisso do Usuário
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"

          style={{marginTop: 10}}
        >
          O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o TecSoftwar81 oferece no site e com caráter enunciativo, mas não limitativo:
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle2"

          style={{marginTop: 10}}
        >
          {"A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;"}
          </Typography>
          <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          {"B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, pix bet365 ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;"}
          </Typography>
          <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          {"C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do TecSoftwar81, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados."}
          </Typography>
          <Typography
          color="textPrimary"
          variant="subtitle2"
          style={{marginTop: 20}}
        >
          Mais informações
           </Typography>
           <Typography
          color="textPrimary"
          variant="subtitle2"
          style={{marginTop: 10}}
        >
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
           </Typography>
        
      </Container>
    </Box>
  </>
);

export default Privacy;

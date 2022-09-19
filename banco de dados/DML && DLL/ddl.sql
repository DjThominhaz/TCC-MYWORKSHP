create database MyWorkshipDB;
use MyWorkshipDB;


/*---------------LOGIN USUARIO--------------------------*/

create table `TB_USUARIO_CLIENTE`  (
	ID_USUARIO_CLIENTE	INT PRIMARY KEY AUTO_INCREMENT,                        
	NM_USUARIO      	VARCHAR(100) not null,
	DS_CPF      		VARCHAR(100) not null,
	DS_PAIS     		VARCHAR(50) not null,
	DS_ESTADO  			VARCHAR(100) not null,
	DS_CIDADE			VARCHAR(100) not null
);

create table `TB_LOGIN_CLIENTE`  (
	ID_LOGIN_CLIENTE    INT PRIMARY KEY AUTO_INCREMENT not null, 
    ID_USUARIO_CLIENTE  INT not null,
	DS_EMAIL            VARCHAR(100) not null,
	DS_SENHA            VARCHAR(100) not null,
    DT_ULTLOGIN			DATETIME not null,
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);

create table `TB_PERFIL_CLIENTE`  (
	ID_PERFIL_CLIENTE    INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_USUARIO_CLIENTE   INT not null,
	NM_PERFIL_EMPRESA    VARCHAR(100) not null,
	IMG_PERFIL_CLIENTE   VARCHAR(500) not null,
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);

/*---------------LOGIN EMPRESA--------------------------*/

create table `TB_USUARIO_EMPRESA`  (
	ID_USUARIO_EMPRESA  			INT PRIMARY KEY AUTO_INCREMENT not null,           
	DS_CNPJ                         VARCHAR(15) not null,
	DS_INSCRICAO_ESTADUAL           VARCHAR(100) not null,
	NM_NOME_DA_EMPRESA              VARCHAR(100) not null,
	DS_ESTADO                       VARCHAR(100) not null,
	NM_REPRESENTANTE                VARCHAR(100) not null,
	DS_CPF_REPRESENTANTE            VARCHAR(12) not null,
	DS_CARGO_REPRESENTANTE          VARCHAR(100) not null,
	DS_NACIONALIDADE_REPRESENTANTE  VARCHAR(100) not null
);

create table `TB_LOGIN_EMPRESA`  (
	ID_LOGIN_EMPRESA    INT PRIMARY KEY AUTO_INCREMENT not null, 
    ID_USUARIO_EMPRESA	INT not null,
	DS_EMAIL            VARCHAR(100) not null,
	DS_SENHA            VARCHAR(50) not null,
    DT_ULTLOGIN			DATETIME not null,
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA)
);

create table `TB_LOCAL_EMPRESA`  (
	ID_LOCAL_EMPRESA	INT PRIMARY KEY AUTO_INCREMENT not null, 
    ID_USUARIO_EMPRESA	INT not null,
    DS_PAIS             VARCHAR(100) not null,
	DS_ESTADO           VARCHAR(100) not null,
	DS_CIDADE           VARCHAR(100) not null,
	DS_ENDERECO         VARCHAR(150) not null,
	DS_CEP              VARCHAR(15) not null,
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA)
);

/*---------------PAGINA EMPRESA--------------------------*/

create table `TB_PAGINA_EMPRESA`  (
	ID_PAGINA_EMPRESA   INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_USUARIO_EMPRESA	INT not null,
	NM_EMPRESA          VARCHAR(100) not null,
	IMG_LOGO            VARCHAR(200) not null,
	DS_DESCRICAO        VARCHAR(100) not null,
	FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA)
);

create table `TB_PAGINA_EMPRESA_PUBLICACAO`  (
	ID_PAGINA_EMPRESA_PUBLICACAO	INT PRIMARY KEY AUTO_INCREMENT not null, 
    ID_PAGINA_EMPRESA				INT not null,
	NM_TITULO                       VARCHAR(100) not null,
	DS_CAIXA_TEXTO                  VARCHAR(1000) not null,
    FOREIGN KEY (ID_PAGINA_EMPRESA) REFERENCES TB_PAGINA_EMPRESA (ID_PAGINA_EMPRESA)
);

create table `TB_PAGINA_EMPRESA_PUBLICACAO_IMG`  (
	ID_PAGINA_EMPRESA_PUBLICACAO_IMG	INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_PAGINA_EMPRESA_PUBLICACAO		INT not null,
	IMG_IMAGEM_PUBLICACAO               VARCHAR(1000) not null,
    FOREIGN KEY (ID_PAGINA_EMPRESA_PUBLICACAO) REFERENCES TB_PAGINA_EMPRESA_PUBLICACAO (ID_PAGINA_EMPRESA_PUBLICACAO)
);

create table `TB_TAG`  (
	ID_TAG	INT PRIMARY KEY AUTO_INCREMENT not null,
	NM_TAG  VARCHAR(100) not null
);

create table `TB_TAG_EMPRESA`  (
	ID_TAG				INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_PAGINA_EMPRESA	INT not null,
    FOREIGN KEY (ID_TAG) REFERENCES TB_TAG (ID_TAG),
    FOREIGN KEY (ID_PAGINA_EMPRESA) REFERENCES TB_PAGINA_EMPRESA (ID_PAGINA_EMPRESA)
);

create table `TB_VERIFICACOES`  (
	ID_VERIFICACOES		INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_PAGINA_EMPRESA	INT not null,
	DS_VERIFICACOES     VARCHAR(100) not null,
    FOREIGN KEY (ID_PAGINA_EMPRESA) REFERENCES TB_PAGINA_EMPRESA (ID_PAGINA_EMPRESA)
);

create table `TB_CERTIFICACOES`  (
	ID_VERIFICACOES		INT PRIMARY KEY AUTO_INCREMENT not null,
    ID_PAGINA_EMPRESA	INT not null,
	DS_CERTIFICACOES     VARCHAR(100) not null,
    FOREIGN KEY (ID_PAGINA_EMPRESA) REFERENCES TB_PAGINA_EMPRESA (ID_PAGINA_EMPRESA)
);

/*---------------AGENDAMENTO--------------------------*/

create table `TB_AGENDAMENTO`  (
	ID_AGENDAMENTO		INT PRIMARY KEY AUTO_INCREMENT not null,
	ID_USUARIO_EMPRESA  INT not null,
	ID_USUARIO_CLIENTE  INT not null,
	NM_PESSOA           VARCHAR(100) not null,
	DS_EMAIL            VARCHAR(200) not null,
	DS_CPF              VARCHAR(15) not null,
	DS_TELEFONE         VARCHAR(10) not null,
	DS_SEXO             VARCHAR(25) not null,
	DT_NASCIMENTO       DATETIME not null,
	DS_DIA              INT not null,
	DS_LOCAL            VARCHAR(100) not null,
	DS_HORA             VARCHAR(100) not null,
    DT_AGENDAMENTO      DATETIME,
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA),
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);

create table `TB_AGENDAMENTO_CAMPO_TEXTO`  (
	ID_AGENDAMENTO_CAMPO_TEXTO	INT PRIMARY KEY AUTO_INCREMENT not null,
	ID_AGENDAMENTO				INT not null,
	ID_USUARIO_EMPRESA          INT not null,
	NM_CAMPO_TEXTO              VARCHAR(100) not null,
	DS_CAMPO_DESC               VARCHAR(100) not null,
    FOREIGN KEY (ID_AGENDAMENTO) REFERENCES TB_AGENDAMENTO (ID_AGENDAMENTO),
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA)
);

create table `TB_AGENDAMENTO_CAMPO_TEXTO_C`  (
	ID_AGENDAMENTOCAMPO_TEXTO_C	INT PRIMARY KEY AUTO_INCREMENT not null,
	ID_USUARIO_CLIENTE       	INT not null,
	ID_AGENDAMENTO_CAMPO_TEXTO 	INT not null,
	DS_CAMPO_TEXTO              VARCHAR(1000) not null,
    FOREIGN KEY (ID_AGENDAMENTO_CAMPO_TEXTO) REFERENCES TB_AGENDAMENTO_CAMPO_TEXTO (ID_AGENDAMENTO_CAMPO_TEXTO),
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);

create table `TB_EMPRESA_AVALIACAO`  (
	ID_EMPRESA_AVALIACAO	INT PRIMARY KEY AUTO_INCREMENT not null,
	ID_USUARIO_EMPRESA  	INT not null,
	ID_USUARIO_CLIENTE  	INT not null,
	VL_AVALIACAO       		INT not null,
	DS_AVALIACAO        	VARCHAR(500) not null,
	DT_AVALIACAO        	DATETIME not null,
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA),
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);

create table `TB_FAVORITO`  (
	ID_FAVORITO				INT PRIMARY KEY AUTO_INCREMENT not null,
	ID_USUARIO_EMPRESA  	INT not null,
	ID_USUARIO_CLIENTE  	INT not null,
	DS_FAVORITO				BOOL not null,
    FOREIGN KEY (ID_USUARIO_EMPRESA) REFERENCES TB_USUARIO_EMPRESA (ID_USUARIO_EMPRESA),
    FOREIGN KEY (ID_USUARIO_CLIENTE) REFERENCES TB_USUARIO_CLIENTE (ID_USUARIO_CLIENTE)
);




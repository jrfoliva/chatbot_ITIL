create database itil;
use itil;

create table chamados (
	numero int auto_increment,
    dataAbertura date,
    dataFechamento date,
    usuario varchar(50) not null,
    matricula varchar(10) not null,
    id_categoria int not null,
	prioridade varchar(15) not null,
    tecnico varchar(30) not null,
    status varchar(20),
    constraint pk_chamados primary key (numero),
    constraint fk_chamados_categoria foreign key (id_categoria)
    references categoria (id)
);

alter table chamados auto_increment = 100100;

create table Categoria (
	id int auto_increment,
    categoria varchar(20) not null unique,
    prazo varchar(10) not null,
    constraint pk_categoria primary key (id) 
);

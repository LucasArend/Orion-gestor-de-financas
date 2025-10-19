--
-- PostgreSQL database dump
--

\restrict 7fUwApeLp79ZhIcEZKnysQBpA3sloYGTOlQgp29DmCwwvOeCU0vRQbMyDCg9Vb8

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying(100),
    usuario_id integer,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categoria OWNER TO orion_user;

--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: orion_user
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_id_seq OWNER TO orion_user;

--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orion_user
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- Name: economia; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.economia (
    usuario_id integer NOT NULL,
    saldo numeric(15,2) DEFAULT 0 NOT NULL,
    reserva_de_emergencia numeric(15,2) DEFAULT 0 NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.economia OWNER TO orion_user;

--
-- Name: goal; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.goal (
    id integer NOT NULL,
    user_id integer,
    objective character varying(255) NOT NULL,
    goal numeric(12,2) NOT NULL,
    saved numeric(12,2) NOT NULL,
    data timestamp without time zone,
    expected_data date,
    data_forecast date,
    contribution numeric(12,2) NOT NULL
);


ALTER TABLE public.goal OWNER TO orion_user;

--
-- Name: goal_id_seq; Type: SEQUENCE; Schema: public; Owner: orion_user
--

CREATE SEQUENCE public.goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goal_id_seq OWNER TO orion_user;

--
-- Name: goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orion_user
--

ALTER SEQUENCE public.goal_id_seq OWNED BY public.goal.id;


--
-- Name: tipo_transacao; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.tipo_transacao (
    id integer NOT NULL,
    nome character varying(50)
);


ALTER TABLE public.tipo_transacao OWNER TO orion_user;

--
-- Name: tipo_transacao_id_seq; Type: SEQUENCE; Schema: public; Owner: orion_user
--

CREATE SEQUENCE public.tipo_transacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_transacao_id_seq OWNER TO orion_user;

--
-- Name: tipo_transacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orion_user
--

ALTER SEQUENCE public.tipo_transacao_id_seq OWNED BY public.tipo_transacao.id;


--
-- Name: transacao; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.transacao (
    id integer NOT NULL,
    usuario_id integer,
    tipo_transacao_id integer,
    categoria_id integer,
    descricao text,
    valor numeric(15,2),
    data_vencimento date,
    data_criacao timestamp without time zone,
    quantidade_parcelas integer,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transacao OWNER TO orion_user;

--
-- Name: transacao_id_seq; Type: SEQUENCE; Schema: public; Owner: orion_user
--

CREATE SEQUENCE public.transacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transacao_id_seq OWNER TO orion_user;

--
-- Name: transacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orion_user
--

ALTER SEQUENCE public.transacao_id_seq OWNED BY public.transacao.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: orion_user
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    senha text NOT NULL,
    foto text,
    google_id text,
    provedor character varying(50) NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuario OWNER TO orion_user;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: orion_user
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_seq OWNER TO orion_user;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: orion_user
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- Name: goal id; Type: DEFAULT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.goal ALTER COLUMN id SET DEFAULT nextval('public.goal_id_seq'::regclass);


--
-- Name: tipo_transacao id; Type: DEFAULT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.tipo_transacao ALTER COLUMN id SET DEFAULT nextval('public.tipo_transacao_id_seq'::regclass);


--
-- Name: transacao id; Type: DEFAULT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.transacao ALTER COLUMN id SET DEFAULT nextval('public.transacao_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.categoria (id, nome, usuario_id, criado_em) FROM stdin;
\.


--
-- Data for Name: economia; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.economia (usuario_id, saldo, reserva_de_emergencia, atualizado_em) FROM stdin;
\.


--
-- Data for Name: goal; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.goal (id, user_id, objective, goal, saved, data, expected_data, data_forecast, contribution) FROM stdin;
\.


--
-- Data for Name: tipo_transacao; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.tipo_transacao (id, nome) FROM stdin;
\.


--
-- Data for Name: transacao; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.transacao (id, usuario_id, tipo_transacao_id, categoria_id, descricao, valor, data_vencimento, data_criacao, quantidade_parcelas, criado_em) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: orion_user
--

COPY public.usuario (id, nome, email, senha, foto, google_id, provedor, criado_em) FROM stdin;
\.


--
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orion_user
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, false);


--
-- Name: goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orion_user
--

SELECT pg_catalog.setval('public.goal_id_seq', 1, false);


--
-- Name: tipo_transacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orion_user
--

SELECT pg_catalog.setval('public.tipo_transacao_id_seq', 1, false);


--
-- Name: transacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orion_user
--

SELECT pg_catalog.setval('public.transacao_id_seq', 1, false);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: orion_user
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, false);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- Name: economia economia_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.economia
    ADD CONSTRAINT economia_pkey PRIMARY KEY (usuario_id);


--
-- Name: goal goal_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.goal
    ADD CONSTRAINT goal_pkey PRIMARY KEY (id);


--
-- Name: tipo_transacao tipo_transacao_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.tipo_transacao
    ADD CONSTRAINT tipo_transacao_pkey PRIMARY KEY (id);


--
-- Name: transacao transacao_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.transacao
    ADD CONSTRAINT transacao_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: categoria categoria_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


--
-- Name: economia economia_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.economia
    ADD CONSTRAINT economia_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: goal goal_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.goal
    ADD CONSTRAINT goal_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usuario(id);


--
-- Name: transacao transacao_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.transacao
    ADD CONSTRAINT transacao_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria(id);


--
-- Name: transacao transacao_tipo_transacao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.transacao
    ADD CONSTRAINT transacao_tipo_transacao_id_fkey FOREIGN KEY (tipo_transacao_id) REFERENCES public.tipo_transacao(id);


--
-- Name: transacao transacao_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: orion_user
--

ALTER TABLE ONLY public.transacao
    ADD CONSTRAINT transacao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 7fUwApeLp79ZhIcEZKnysQBpA3sloYGTOlQgp29DmCwwvOeCU0vRQbMyDCg9Vb8


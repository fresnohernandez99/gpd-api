--
-- PostgreSQL database TO INIT GPD project 
-- Credentials
-- user: ADMIN password: admin

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.1

-- Started on 2022-10-03 08:52:34 CDT

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
-- TOC entry 202 (class 1259 OID 18373)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    displayname character varying NOT NULL,
    phone character varying(10) NOT NULL,
    password character varying NOT NULL,
    photo character varying,
    state character varying DEFAULT 'WAITING'::character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 18371)
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- TOC entry 3310 (class 0 OID 0)
-- Dependencies: 201
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- TOC entry 207 (class 1259 OID 18439)
-- Name: person_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person_roles (
    "personId" integer NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public.person_roles OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 18425)
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id integer NOT NULL,
    "projectName" character varying NOT NULL,
    area character varying NOT NULL,
    logo character varying,
    state character varying DEFAULT 'WAITING'::character varying,
    start_date timestamp without time zone DEFAULT now() NOT NULL,
    end_date timestamp without time zone DEFAULT now() NOT NULL,
    "ownerId" integer
);


ALTER TABLE public.project OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 18423)
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO postgres;

--
-- TOC entry 3311 (class 0 OID 0)
-- Dependencies: 205
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- TOC entry 204 (class 1259 OID 18412)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 18410)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 3312 (class 0 OID 0)
-- Dependencies: 203
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 200 (class 1259 OID 18336)
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO postgres;

--
-- TOC entry 3139 (class 2604 OID 18376)
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- TOC entry 3146 (class 2604 OID 18428)
-- Name: project id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- TOC entry 3143 (class 2604 OID 18415)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 3299 (class 0 OID 18373)
-- Dependencies: 202
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (id, displayname, phone, password, photo, state, created_at, updated_at) FROM stdin;
1	Admin	00000000	$2a$10$80JR9UF.EgUAlHyM1OA5K.P2vq1x4j/429Ksfc7.K/dkFwsKuCTmK	default.png	ACTIVE	2022-10-02 16:15:30.320098	2022-10-02 16:15:30.320098
\.


--
-- TOC entry 3304 (class 0 OID 18439)
-- Dependencies: 207
-- Data for Name: person_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person_roles ("personId", "roleId") FROM stdin;
1	1
\.


--
-- TOC entry 3303 (class 0 OID 18425)
-- Dependencies: 206
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (id, "projectName", area, logo, state, start_date, end_date, "ownerId") FROM stdin;
\.


--
-- TOC entry 3301 (class 0 OID 18412)
-- Dependencies: 204
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name, description, created_at, updated_at) FROM stdin;
1	ADMIN	Soft owner	2022-10-03 08:45:27.984953	2022-10-03 08:45:27.984953
2	LEAD	Project owner	2022-10-03 08:45:27.984953	2022-10-03 08:45:27.984953
3	GENERAL	Regular client	2022-10-03 08:45:27.984953	2022-10-03 08:45:27.984953
\.


--
-- TOC entry 3297 (class 0 OID 18336)
-- Dependencies: 200
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- TOC entry 3313 (class 0 OID 0)
-- Dependencies: 201
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 1, true);


--
-- TOC entry 3314 (class 0 OID 0)
-- Dependencies: 205
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 1, false);


--
-- TOC entry 3315 (class 0 OID 0)
-- Dependencies: 203
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 3, true);


--
-- TOC entry 3157 (class 2606 OID 18436)
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- TOC entry 3151 (class 2606 OID 18384)
-- Name: person PK_5fdaf670315c4b7e70cce85daa3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY (id);


--
-- TOC entry 3163 (class 2606 OID 18443)
-- Name: person_roles PK_854c936822ff5507cfa8053e07b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT "PK_854c936822ff5507cfa8053e07b" PRIMARY KEY ("personId", "roleId");


--
-- TOC entry 3155 (class 2606 OID 18422)
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 3159 (class 2606 OID 18438)
-- Name: project UQ_22eee2edb529c134f0f4ecad3ad; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "UQ_22eee2edb529c134f0f4ecad3ad" UNIQUE ("projectName");


--
-- TOC entry 3153 (class 2606 OID 18386)
-- Name: person UQ_ed9d5dea665e5d266ed2c592def; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT "UQ_ed9d5dea665e5d266ed2c592def" UNIQUE (phone);


--
-- TOC entry 3160 (class 1259 OID 18445)
-- Name: IDX_32b22e80cb9f872f9c2239edcc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_32b22e80cb9f872f9c2239edcc" ON public.person_roles USING btree ("roleId");


--
-- TOC entry 3161 (class 1259 OID 18444)
-- Name: IDX_9a12accee1507f0bba26e7788f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_9a12accee1507f0bba26e7788f" ON public.person_roles USING btree ("personId");


--
-- TOC entry 3166 (class 2606 OID 18456)
-- Name: person_roles FK_32b22e80cb9f872f9c2239edcc3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT "FK_32b22e80cb9f872f9c2239edcc3" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- TOC entry 3164 (class 2606 OID 18446)
-- Name: project FK_9884b2ee80eb70b7db4f12e8aed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES public.person(id);


--
-- TOC entry 3165 (class 2606 OID 18451)
-- Name: person_roles FK_9a12accee1507f0bba26e7788f0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person_roles
    ADD CONSTRAINT "FK_9a12accee1507f0bba26e7788f0" FOREIGN KEY ("personId") REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-10-03 08:52:34 CDT

--
-- PostgreSQL database dump complete
--


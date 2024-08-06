--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-08-06 23:12:22

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

--
-- TOC entry 6 (class 2615 OID 16586)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4865 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 846 (class 1247 OID 16599)
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16613)
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16604)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(100) NOT NULL,
    role public."Role" DEFAULT 'user'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16587)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4857 (class 0 OID 16613)
-- Dependencies: 218
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, title, content, "userId", "createdAt", "updatedAt") FROM stdin;
02b1ee81-ddca-4aa9-b88f-f6f02e55a206	new post	new content	7fb99fc6-dcac-43bf-a0ab-162a115c3959	2024-08-06 19:51:54.984	2024-08-06 19:51:54.984
\.


--
-- TOC entry 4856 (class 0 OID 16604)
-- Dependencies: 217
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, role, "createdAt", "updatedAt") FROM stdin;
7fb99fc6-dcac-43bf-a0ab-162a115c3959	test1@test.com	q1w2e3	user	2024-08-06 16:08:05.392	2024-08-06 16:08:05.392
a191b6c7-599f-41d6-8baf-c65c8979fb9d	test@test.com	q1w2e3	admin	2024-08-06 15:57:58.436	2024-08-06 16:23:23.664
46ceeaee-36ce-49e5-8941-57eb9dcf414b	admin@test.com	q1w2e3	admin	2024-08-06 17:13:46.69	2024-08-06 17:13:46.69
eaed2746-457f-4a3d-b38c-87c80a1e78ab	test3@test.com	q1w2e3	user	2024-08-06 19:52:40.203	2024-08-06 19:52:40.203
13bd025c-549d-4722-a978-c03348e9587c	test2@test.com	$2b$10$cVi/JIora7fq8TKHKTRozepam.lM7rrpGSajYKtnX1X6hE4aiDSVK	user	2024-08-06 19:58:16.675	2024-08-06 19:58:16.675
\.


--
-- TOC entry 4855 (class 0 OID 16587)
-- Dependencies: 216
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
65280416-c4f8-4370-891c-cbf3e3cec3c0	426b377b29bbf4e2ece4971ff849dbee77eeb03a00acf02fa9764eeb558643da	2024-08-06 08:24:23.380415+03	20240806052405_add	\N	\N	2024-08-06 08:24:23.313226+03	1
323d1796-1696-4f88-8d6a-286c708b228b	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2024-08-06 09:08:07.524601+03	20240806060753_add	\N	\N	2024-08-06 09:08:07.513263+03	1
99b19541-8ecd-42b9-98b5-df9895313185	af69024e11eff423e222892d1d14be402c936dbeff8e7e9bbd1f3f03c8adb8ad	2024-08-06 11:33:43.055134+03	20240806083315_add	\N	\N	2024-08-06 11:33:42.944832+03	1
\.


--
-- TOC entry 4710 (class 2606 OID 16885)
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16893)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 16595)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 1259 OID 16622)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4711 (class 2606 OID 16903)
-- Name: Post Post_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-08-06 23:12:23

--
-- PostgreSQL database dump complete
--


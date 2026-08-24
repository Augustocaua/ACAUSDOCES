// Projeto desenvolvido por ACAUS
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";
import hero from "@/assets/hero.jpg";
import brownie from "@/assets/brownie.jpg";
import pote from "@/assets/pote.jpg";
import bolo from "@/assets/bolo.jpg";
import kit from "@/assets/kit.jpg";
import beijinho from "@/assets/beijinho.jpg";

const TITLE = "ACAUS · Doceria artesanal";
const DESC =
  "Brigadeiros gourmet, brownies, bolos de pote e kits feitos à mão. Veja as fotos e peça pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATS = "https://wa.me/5571982875822?text=Oi!%20Vim%20pelo%20cat%C3%A1logo%20";

type Doce = {
  id: string;
  cat: string;
  nome: string;
  preco: string;
  nota: string;
  img: string;
};

const doces: Doce[] = [
  {
    id: "brigadeiro",
    cat: "doces",
    nome: "Brigadeiro belga",
    preco: "R$ 4,50",
    nota: "chocolate 53% e granulado belga",
    img: hero,
  },
  {
    id: "brownie",
    cat: "brownies",
    nome: "Brownie recheado",
    preco: "R$ 12,00",
    nota: "casquinha craquelada, miolo úmido",
    img: brownie,
  },
  {
    id: "pote",
    cat: "bolos",
    nome: "Bolo de pote",
    preco: "R$ 15,00",
    nota: "camadas de brownie e creme",
    img: pote,
  },
  {
    id: "beijinho",
    cat: "doces",
    nome: "Beijinho de coco",
    preco: "R$ 4,00",
    nota: "coco fresco e cravo",
    img: beijinho,
  },
  {
    id: "bolo",
    cat: "bolos",
    nome: "Fatia de bolo",
    preco: "R$ 18,00",
    nota: "três camadas, ganache",
    img: bolo,
  },
  {
    id: "kit",
    cat: "kits",
    nome: "Caixa com 12",
    preco: "R$ 62,00",
    nota: "sortidos, embalados à mão",
    img: kit,
  },
];

const cats = [
  { id: "todos", label: "Tudo" },
  { id: "bolos", label: "Bolos" },
  { id: "doces", label: "Doces" },
  { id: "brownies", label: "Brownies" },
  { id: "kits", label: "Kits" },
];

function Index() {
  const [cat, setCat] = useState("todos");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lista = cat === "todos" ? doces : doces.filter((d) => d.cat === cat);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-40">
      {/* capa */}
      <section className="mx-auto max-w-[560px] px-6 pt-14 text-center lg:max-w-[720px] lg:pt-24">
        <p className="eyebrow">desde 2026 · feito à mão</p>
        <h1 className="mt-5 font-script text-5xl leading-[1.05] text-primary lg:text-7xl">
          ACAUS
        </h1>
        <p className="mx-auto mt-4 max-w-[19ch] font-display text-xl italic text-muted-foreground lg:text-2xl">
          Feito para adoçar o seu dia.
        </p>

        <Reveal className="mt-9">
          <figure className="grain overflow-hidden rounded-[999px_999px_28px_28px] shadow-[var(--shadow-soft)]">
            <img
              src={hero}
              alt="Brigadeiro belga artesanal em prato de cerâmica"
              width={1024}
              height={1408}
              className="h-[68vh] w-full object-cover lg:h-[78vh]"
            />
          </figure>
        </Reveal>
      </section>

      {/* categorias */}
      <nav className="sticky top-0 z-30 mt-14 border-y border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] gap-6 overflow-x-auto px-6 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`shrink-0 text-[0.68rem] uppercase tracking-[0.3em] transition-colors ${
                cat === c.id
                  ? "text-primary underline decoration-accent decoration-2 underline-offset-8"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </nav>

      {/* feed */}
      <section className="mx-auto max-w-[560px] px-6 lg:max-w-[760px]">
        {lista.map((d, i) => (
          <Reveal key={d.id} className="pt-16 lg:pt-24">
            <article>
              <figure className="grain overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                <img
                  src={d.img}
                  alt={d.nome}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-[62vh] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.04] lg:h-[80vh]"
                />
              </figure>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-border/70 pb-6">
                <div className="min-w-0">
                  <h2 className="font-display text-2xl leading-tight lg:text-3xl">{d.nome}</h2>
                  <p className="mt-1 text-xs lowercase tracking-wide text-muted-foreground">
                    {d.nota}
                  </p>
                </div>
                <span className="shrink-0 font-display text-lg text-accent-foreground lg:text-xl">
                  {d.preco}
                </span>
              </div>
              {i === 2 && (
                <p className="pt-14 text-center font-script text-3xl text-accent-foreground/80">
                  encomendas com 2 dias
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </section>

      {/* rodapé */}
      <footer className="mx-auto mt-24 max-w-[560px] px-6 pb-4 text-center">
        <p className="font-script text-3xl text-primary">ACAUS</p>
        <p className="mt-4 text-xs leading-6 tracking-[0.18em] text-muted-foreground uppercase">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            @acaus
          </a>
          <br />
          salvador · BAHIA
          <br />
          Ter a sáb · 10h às 19h
        </p>
      </footer>

      {/* whatsapp */}
      <a
        href={WHATS}
        target="_blank"
        rel="noreferrer"
        className={`fixed inset-x-5 bottom-5 z-40 mx-auto flex max-w-[420px] items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-700 hover:brightness-110 active:scale-[0.98] ${
          scrolled ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-[0.7rem] uppercase tracking-[0.32em]">Pedir pelo WhatsApp</span>
      </a>
    </main>
  );
}

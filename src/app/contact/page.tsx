import { EMAIL, INSTAGRAM } from "@/data/links";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pt-[76px] md:px-8">
      <h1 className="display text-[clamp(3rem,10vw,103px)]">Contact</h1>
      <div className="mt-[76px] grid items-start gap-[19px] md:grid-cols-[1fr_minmax(0,440px)]">
        <div className="grid gap-[19px]">
          <div className="border border-ink bg-paper p-5 md:p-[30px]">
            <p className="label">Bookings and partnerships</p>
            <a href={`mailto:${EMAIL}`} className="mt-[19px] block text-[clamp(1.4rem,3vw,34px)] leading-none underline-offset-4 hover:underline">
              {EMAIL}
            </a>
          </div>
          <div className="border border-ink bg-paper p-5 md:p-[30px]">
            <p className="label">Instagram</p>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-[19px] block text-[clamp(1.4rem,3vw,34px)] leading-none underline-offset-4 hover:underline">
              @itsaclosecall
            </a>
            <p className="mt-[19px] text-[15px]">Line-ups, flyers and ticket drops land here first.</p>
          </div>
        </div>
        <div className="border border-ink bg-paper">
          <iframe
            title="CloseCall on Instagram"
            src={`${INSTAGRAM}embed`}
            className="block h-[470px] w-full"
            loading="lazy"
          />
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="label block border-t border-ink px-5 py-3 hover:underline md:px-[30px]">
            View the full profile on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}

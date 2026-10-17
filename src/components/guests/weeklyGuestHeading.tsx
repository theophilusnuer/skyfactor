import { motion } from "framer-motion";

export default function WeeklyGuestHeading({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-left"
>
  <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
    <span className="h-px w-8 bg-sky-400" />
    Featured this week
  </p>

  <h2
    id="guest-teaser-heading"
    className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.065em]"
  >
    Meet the{" "}
    <em className="font-playfair font-normal tracking-[-0.05em]">
      voices
    </em>{" "}
    in the room.
  </h2>
</motion.div>
  );
}
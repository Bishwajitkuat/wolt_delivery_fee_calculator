export default function Heading({ title }: { title: string }) {
  return (
    <h1 className="text-[2rem] text-center mb-[2rem] text-slate-200 font-semibold">
      {title}
    </h1>
  );
}

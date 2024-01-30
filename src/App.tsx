import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="bg-gray-900">
      <div className=" mx-auto bg-[url(public/yuhos.png)] h-screen w-screen max-w-[1350px] bg-no-repeat bg-cover flex justify-center items-center">
        <Calculator />
      </div>
    </div>
  );
}

export default App;

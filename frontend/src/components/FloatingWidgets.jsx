import { SiWhatsapp } from "@icons-pack/react-simple-icons";


export default function FloatingWidgets() {

  return (
    <>
      {/* 3. Bottom-Right Whatsapp button */}
      <div className="floating-chat-container">
        <a href='https://api.whatsapp.com/send/?phone=919969454909&text=Hi+TK+Fashion+Collection%21+I+have+a+question+about+size%2C+fabric+or+availability.&type=phone_number&app_absent=0'>
          <button className="floating-chat-btn">
            <SiWhatsapp size={24} fill="#FFFFFF" color="#000000" />
          </button>
        </a>
      </div>
    </>
  );
}


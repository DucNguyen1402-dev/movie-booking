import ButtonActions from "./ButtonActions";
import HeaderContent from "./HeaderContent";

export default function EditHeader() {
  return (
    <header className="flex items-center justify-between">
      <HeaderContent />

      <ButtonActions />
    </header>
  );
}

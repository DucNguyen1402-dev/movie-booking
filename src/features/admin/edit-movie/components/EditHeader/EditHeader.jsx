import HeaderContent from "./HeaderContent";
import ButtonActions from "./ButtonActions";

export default function EditHeader() {
  return (
    <header className="flex items-center justify-between">
      <HeaderContent />

      <ButtonActions />
    </header>
  );
}

import ButtonActions from "./ButtonActions";
import HeaderContent from "./HeaderContent";

const EditHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <HeaderContent />

      <ButtonActions />
    </header>
  );
};

export default EditHeader;

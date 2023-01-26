import CardReport from "../../components/cardReport";
import Layout from "./layout";
import { FaPlane, FaAdversal, FaFacebook } from "react-icons/fa"

export default function AdminIndex() {
  return (
    <Layout>
      <div className=" w-full grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
        <CardReport bg="bg-[#354259]" />
        <CardReport icon={<FaPlane />} title={"plane"} percent={48} />
        <CardReport bg="bg-[#354259]" icon={<FaAdversal />} percent={75} />
        <CardReport icon={<FaFacebook />} title={"FaceBook"} percent={84} />
      </div>
    </Layout>
  );
}

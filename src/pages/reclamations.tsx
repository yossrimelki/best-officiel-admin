import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import TableThree from '../components/Tables/TableThree';
import TableOne from '../components/Tables/TableOne';


const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Reclamations" />

      <div className="flex flex-col gap-10">

        <TableThree />
      </div>
    </>
  );
};

export default Tables;

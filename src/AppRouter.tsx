import { Route, Routes } from "react-router-dom";
import { TicketListView } from "./pages/TicketListView";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketListView />} />
    </Routes>
  );
};

export default AppRouter;

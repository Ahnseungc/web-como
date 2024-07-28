"use client";

import Backdrop from "@/components/common/Backdrop";
import ReservationPanel from "@/components/dashboard/club/reservation/organisms/ReservationPanel";

export default function ReservationChangeModal() {
  return (
    <div id="reservation-change" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50">
        <ReservationPanel isChangeReservation productId={1} />
      </div>
    </div>
  );
}

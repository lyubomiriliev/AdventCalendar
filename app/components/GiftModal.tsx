import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Gift } from "../types";

interface GiftModalProps {
  gift: Gift | null;
  onClose: () => void;
}

export function GiftModal({ gift, onClose }: GiftModalProps) {
  console.log("Modal Gift Data:", gift); // Debugging

  return (
    <Dialog open={!!gift} onOpenChange={onClose}>
      <DialogContent className="w-full flex flex-col justify-center bg-gradient-to-r from-slate-400 via-slate-50 to-slate-100 items-center p-4">
        {gift ? (
          <>
            <DialogTitle className="text-3xl">Day {gift.id}</DialogTitle>
            <DialogDescription className="text-3xl text-center font-serif uppercase font-medium max-w-[300px]">
              {gift.content}
            </DialogDescription>
            <div className="bg-red-600 p-2 rounded-full">{gift.icon}</div>
          </>
        ) : (
          <p>No gift selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

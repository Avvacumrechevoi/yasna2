"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ModalContextType = {
  isOpen: boolean;
  source: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  source: "",
  openModal: () => {},
  closeModal: () => {},
});

export function useSignupModal() {
  return useContext(ModalContext);
}

export function SignupModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");

  const openModal = useCallback((src: string = "unknown") => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, source, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

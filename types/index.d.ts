import { Document } from "mongoose";

declare interface FeatureCardProps {
  head: string;
  description: string;
}
declare interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}


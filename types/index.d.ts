declare interface FeatureCardProps {
  head: string;
  description: string;
}
declare interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

declare type AddContentModalContextType = {
  addingContent: boolean;
  setAddingContent: React.Dispatch<React.SetStateAction<boolean>>;
};


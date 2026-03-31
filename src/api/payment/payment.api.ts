import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//? create Participant
const createParticipantApi = async (payload: any) => {
  const { data } = await api.post("/participant", payload, {});
  return data;
};

//? create Participant hook
export const useCreateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createParticipantApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

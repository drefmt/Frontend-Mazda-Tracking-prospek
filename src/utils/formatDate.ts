import { format } from "date-fns";
import { id } from "date-fns/locale";


export const formatDate = (dateStr: string) => format(new Date(dateStr), "dd MMMM yyyy", { locale: id });

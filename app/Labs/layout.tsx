import { ReactNode } from "react";
import TOC from "./TOC";
import "bootstrap/dist/css/bootstrap.min.css";


export default function LabsLayout({
 children,
}: Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td colSpan={2} style={{ paddingBottom: 12 }}>
           <TOC />
         </td>
       </tr>
       <td valign="top">{children}</td>
     </tbody>
   </table>
);}

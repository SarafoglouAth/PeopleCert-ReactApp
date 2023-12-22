import React from "react";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./Exams.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Image } from "primereact/image";

const loopTest = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
];



function Exams() {
  return (
    <div>
      <div className="card">
        <Accordion>
          {loopTest.map((a) => (
            <AccordionTab
              header={
                <div className="flex justify-content-between align-items-center">
                  <span>{a}</span>
                  <div className="p-buttonset">
                    <Button label="Update" icon="pi pi-check" size="small" severity="secondary" />
                    <Button label="Delete" icon="pi pi-trash" size="small" severity="danger" />
                  </div>
                </div>
              }
            >
              <div className="card flex justify-content-center">
                <Image
                  src="https://getwallpapers.com/wallpaper/full/c/6/5/616497.jpg"
                  alt="Image"
                  width="350"
                />
              </div>
              <p>Answer1</p>
              <p>Answer2</p>
              <p>Answer3</p>
              <p>Answer4</p>
              <p>Answer5</p>
            </AccordionTab>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Exams;

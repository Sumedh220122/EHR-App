import { Controller, Get, Route, Tags, Path, Response, SuccessResponse } from "tsoa";
import { Patient } from "../types/patient";
import { patientService } from "../services/PatientService";

@Route("api/v1/patients")
@Tags("Patients")
export class PatientController extends Controller {
  
   /**
   * Get a patient by ID
   * @param id Patient's unique identifier
   */
  @Get("{id}")
  @SuccessResponse("200", "OK")
  @Response<null>(404, "Patient not found")
  @Response<null>(500, "Internal server error")
  public async getPatientById(
    @Path() id: string
  ): Promise<Patient> {
    const patient = await patientService.getPatientById(id);

    if (!patient) {
      this.setStatus(404);
      throw new Error("Patient not found");
    }

    this.setStatus(200);
    return patient;
  }
}

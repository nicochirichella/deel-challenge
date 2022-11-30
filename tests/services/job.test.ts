import * as jobService from "../../src/services/job";
import * as contractService from "../../src/services/contract";
import Job from "../../src/db/models/Job";
import Contract from "../../src/db/models/Contract";
import Profile from "../../src/db/models/Profile";

describe("Job Service", () => {
    describe("payJob", () => {
    
        it("Should return false in case it doesn't found a job", async () => {
            const mockGetData = jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(null));
            const result = await jobService.payJob(1, 1);
            expect(result).toBeFalsy();
        });

        it("Should return false in case it doesn't found a contract", async () => {
            jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(new Job()));
            jest.spyOn(contractService, "getContractById").mockReturnValue(Promise.resolve(null));

            const result = await jobService.payJob(1, 1);
            expect(result).toBeFalsy();
        });

        it("Should return false in case it doesn't found a client", async () => {
            jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(new Job()));
            jest.spyOn(contractService, "getContractById").mockReturnValue(Promise.resolve(new Contract()));
            jest.spyOn(Profile, "findByPk").mockReturnValue(Promise.resolve(null));

            const result = await jobService.payJob(1, 1);
            expect(result).toBeFalsy();
        });

        it("Should return false in case it doesn't found a contractor", async () => {
            jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(new Job()));
            jest.spyOn(contractService, "getContractById").mockReturnValue(Promise.resolve(new Contract()));
            jest.spyOn(Profile, "findByPk").mockReturnValue(Promise.resolve(new Profile()));

            const result = await jobService.payJob(1, 1);
            expect(result).toBeFalsy();
        });

        it("Should return false in case the client doesn't have enough balance", async () => {
            const job = new Job();
            job.price = 100;
            const profile = new Profile();
            profile.balance = 0;

            jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(job));
            jest.spyOn(contractService, "getContractById").mockReturnValue(Promise.resolve(new Contract()));
            jest.spyOn(Profile, "findByPk").mockReturnValue(Promise.resolve(profile));

            const result = await jobService.payJob(1, 1);
            expect(result).toBeFalsy();
        });

        it("Should call Job.update and Profile.update twice in case the job is paid", async () => {
            const job = new Job();
            job.price = 100;
            const profile = new Profile();
            profile.balance = 100;

            jest.spyOn(jobService, "getJobById").mockReturnValue(Promise.resolve(job));
            jest.spyOn(contractService, "getContractById").mockReturnValue(Promise.resolve(new Contract()));
            jest.spyOn(Profile, "findByPk").mockReturnValue(Promise.resolve(profile));
            jest.spyOn(job, "update").mockReturnValue(Promise.resolve(job));
            jest.spyOn(profile, "update").mockReturnValue(Promise.resolve(profile));

            const result = await jobService.payJob(1, 1);
            expect(result).toBeTruthy();
            expect(job.update).toHaveBeenCalledTimes(1);
            expect(profile.update).toHaveBeenCalledTimes(2);
        });

    });
});
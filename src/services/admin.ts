import sequelize from "../db/dbSetup";
import { QueryTypes } from "sequelize";

export const clientsThatPaidTheMost = async (startDate: string, endDate: string, limit = 2) => {
    const clients = await sequelize.query(`
        SELECT "ClientId", SUM("price") AS "totalPaid"
        FROM "Jobs"
        INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
        INNER JOIN "Profiles" ON "Contracts"."ClientId" = "Profiles"."id"
        WHERE "Jobs"."paid" = true
        AND "Jobs"."paymentDate" BETWEEN :startDate AND :endDate
        GROUP BY "ClientId"
        ORDER BY "totalPaid" DESC
        LIMIT :limit
    `, {
        replacements: {
            startDate,
            endDate,
            limit
        },
        type: QueryTypes.SELECT
    });
    return clients
}

export const bestProfession = async (startDate: string, endDate: string) => {
    const profession = await sequelize.query(`
        SELECT "profession", SUM("price") AS "totalPaid"
        FROM "Jobs"
        INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
        INNER JOIN "Profiles" ON "Contracts"."ContractorId" = "Profiles"."id"
        WHERE "Jobs"."paid" = true
        AND "Jobs"."paymentDate" BETWEEN :startDate AND :endDate
        GROUP BY "profession"
        ORDER BY "totalPaid" DESC
        LIMIT 1
    `, {
        replacements: {
            startDate,
            endDate
        },
        type: QueryTypes.SELECT
    });
    return profession[0]
}
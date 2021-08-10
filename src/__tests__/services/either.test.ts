import { Either, left, right } from "../../utils/either";

describe("Either Test Function", () => {
    const negativePatientCountError = () => ({
        message: 'All patient counts should be strictly positive',
    });

    const sumPatientCounts = (...patientCounts: Array<number>): Either<{ message: string }, number> => {
        if (patientCounts.some(count => count < 0)) {
            return left(negativePatientCountError());
        }

        return right(patientCounts.reduce((acc, count) => acc + count, 0));
    }

    it("should return a right value when all patient counts are positive", () => {
        const patientCounts = [1, 2, 3];
        const result = sumPatientCounts(...patientCounts);

        expect(result.isRight()).toBe(true); // cek klo penjumlahan semua count adalah positif
        expect(result.value).toEqual(6);
    })

    it("shoud return lef" , () => {
        const patientCounts = [1, -2, 3]; // with negative count

        const result = sumPatientCounts(...patientCounts);
    
        expect(result.isLeft()).toBe(true); // cek klo penjumlahan semua count adalah negatif
    })

})
import Adder from "../src/Adder";
import { numberGenerator } from "../src/numberGenerator";
jest.mock('../src/numberGenerator');

const adder = new Adder();

let a: number;
let b: number;

beforeAll(() => {
    a = 1;
    b = 1;
});

it('adds a + b',  () => {
    //test equality
    expect(adder.sum(a, b)).toEqual(2);
});


describe('Adder', () => {

    beforeAll(() => {
        b = 2;
    });

    describe('add two values', () => {

        it('adds a + b',  () => {
            //test equality
            expect(adder.sum(a, b)).toEqual(3);

            //test negative equality
            expect(adder.sum(a, b)).not.toBe(2);

            //test inequality
            expect(adder.sum(a, b)).toBeGreaterThan(2);

            //test string matching
            expect(adder.sum(a, b).toString()).toMatch('3');

            //test array
            expect([adder.sum(a, b)]).toContain(3);

        });
    })

    describe('async add two values', () => {
        beforeEach(() => {
            a = 2;
        });

        it('should test an async adder',  () => {
            return adder.sumWithDelay(a, b).then(res => expect(res).toEqual(4));
        });

        it('should test an async adder',  () => {
            return expect(adder.sumWithDelay(a, b)).resolves.toEqual(4);
        });

        it('should test an async adder', async () => {
            expect(await adder.sumWithDelay(a, b)).toEqual(4);
        });
    })


    describe('add two random mocked values', () => {
        const mockNumber = numberGenerator as jest.Mock;
        mockNumber.mockReturnValue(5);

        it('adds two random numbers defined by mockReturnValue', () => {
            expect(adder.sumTwoNumbers()).toBe(10);
            expect(mockNumber.mock.calls.length).toHaveBeenCalledTimes(2);
        });

        it('adds one random number defined by mockReturnValue and one random number defined by mockReturnValueOnce', () => {
            mockNumber.mockReturnValueOnce(1);
            expect(adder.sumTwoNumbers()).toBe(6);
        });

        it('adds two random numbers defined by mockReturnValueOnce', () => {
            mockNumber.mockReturnValueOnce(1).mockReturnValueOnce(3);
            expect(adder.sumTwoNumbers()).toBe(4);
        });
    })
});


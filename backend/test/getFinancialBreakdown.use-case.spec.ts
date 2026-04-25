import { GetFinancialBreakdownUseCase } from '@/application/use-cases/Transaction/getFinancialBreakdown.use-case';

describe('GetFinancialBreakdownUseCase', () => {
  let useCase: GetFinancialBreakdownUseCase;

  beforeEach(() => {
    useCase = new GetFinancialBreakdownUseCase();
  });

  it('should correctly calculate breakdown when listing and selling agents are the same', () => {
    const transaction = {
      totalServiceFee: 1000,
      listingAgent: { _id: 'agent1', name: 'John Doe' },
      sellingAgent: { _id: 'agent1', name: 'John Doe' },
    };

    const result = useCase.execute(transaction);

    expect(result).toEqual({
      totalFee: 1000,
      agencyShare: 500,
      listingAgentShare: 500,
      sellingAgentShare: 0,
      listingAgentName: 'John Doe',
      sellingAgentName: 'John Doe',
    });
  });

  it('should correctly calculate breakdown when listing and selling agents are different', () => {
    const transaction = {
      totalServiceFee: 1000,
      listingAgent: { _id: 'agent1', name: 'John Doe' },
      sellingAgent: { _id: 'agent2', name: 'Jane Smith' },
    };

    const result = useCase.execute(transaction);

    expect(result).toEqual({
      totalFee: 1000,
      agencyShare: 500,
      listingAgentShare: 250,
      sellingAgentShare: 250,
      listingAgentName: 'John Doe',
      sellingAgentName: 'Jane Smith',
    });
  });
});
